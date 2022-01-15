from icalendar import Calendar, Event
from .bs_script import save_img_from_url, save_img_from_bing
from ..models import Event, Place
from .helper_scripts import get_or_create_place
import json
from zipfile import ZipFile
from dateutil import parser
import csv


def parse_json_to_event(json_file):
    # TODO support multievent json file upload
    with open(f"./media/{json_file}") as file:
        data = json.load(file)
        return Event.objects.create(
            title=data["title"],
            date=data["date"],
            description=data["description"],
            place=Place.objects.get(pk=int(data["place"])),
            is_active=True
        )


def parse_ics_to_event(ics_file):
    events_list = []
    with open(f"./media/{ics_file}") as file:
        gcal = Calendar.from_ical(file.read())
        for component in gcal.walk():
            if component.name == "VEVENT":
                new_event = None
                try:
                    new_event = Event.objects.create(
                        title=f"{component.get('summary')}",
                        date=component.get('dtstart').dt,
                        description=f"{component.get('description')}",
                        place=get_or_create_place(component.get('location')),
                        is_active=True,
                    )
                    events_list.append(new_event)
                except TypeError as e:
                    print(f"HOWDY, WE GOT TYPERRROR: {e}")
                if new_event:
                    if component.get('url'):
                        new_event.picture = save_img_from_url(
                            component.get('url'), 
                        )
                        new_event.save()
                    if not new_event.picture:
                        save_img_from_bing(new_event)
    return events_list


def parse_zip_to_event(zip_file):
    # here it is asserted that .zip file comes from Notion app and is having .md calendar
    # TODO rewrite it to be more flexible
    events_list = []
    with ZipFile(f"./media/{zip_file}", 'r') as zipObj:
        listOfFileNames = zipObj.namelist()
        for fileName in listOfFileNames:
            if fileName.endswith('.md'):
                zipObj.extract(fileName, 'media/event/file_imports/temp_md')
                with open(f"media/event/file_imports/temp_md/{fileName}", 'r') as md_file:
                    lines = [line for line in md_file]
                    events_list.append(Event.objects.create(
                        title=lines[0][2:],
                        date=parser.parse(lines[2][6:]),
                        description="Imported from .md",
                        is_active=True
                    ))
            if fileName.endswith('.csv'):
                zipObj.extract(fileName, 'media/event/file_imports/temp_csv')
                with open(f"media/event/file_imports/temp_csv/{fileName}", 'r') as csv_file:
                    csv_reader = csv.DictReader(csv_file)
                    line_count = 0
                    for row in csv_reader:
                        try:
                            e = Event.objects.create(
                                title=row['\ufeffName'],  # why is that? idk
                                date=parser.parse(row['Date']),
                                is_active=True
                            )
                            print(e)
                            events_list.append(e)
                        except parser._parser.ParserError:
                            continue
                        line_count += 1
    return events_list


def parse_csv_to_event(csv_file):
    events_list = []
    with open(f"./media/{csv_file}") as file:
        csv_reader = csv.DictReader(file)
        line_count = 0
        for row in csv_reader:
            name, date, description, place = row['Name'], row['Date'], row['Description'], row['Place']
            try:
                e = Event.objects.create(
                        title=name,
                        date=parser.parse(date),
                        description=description,
                        place=get_or_create_place(place),
                        is_active=True
                        )
                print(e)
                events_list.append(e)
            except parser._parser.ParserError:
                continue
            line_count += 1
    return events_list

