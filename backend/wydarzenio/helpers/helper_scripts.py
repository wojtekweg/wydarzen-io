from ..models import DiscordChannel, Place
import requests


def get_or_create_place(place_name) -> Place:
    """
    Search for place object by name and create new if not found.
    In case of problems (for example auth), it will use default (pk=1) place.
    """
    # https://amittbhardwj.wordpress.com/2015/10/12/django-queryset-get_or_create/
    if place_name is not None:
        try:
            return Place.objects.get(name=place_name)
        except Place.DoesNotExist:
            # TODO use geocoding API to find coords
            return Place.objects.create(
                name=place_name,
                country="PL")
    return Place.objects.get(pk=1)


def get_or_create_discord_channel(discord_url, name="Created without name specified") -> DiscordChannel:
    """
    Search for DiscordChannel object by URL and create new if not found.
    """
    if discord_url is not None:
        try:
            return DiscordChannel.objects.get(channel_url=discord_url)
        except DiscordChannel.DoesNotExist:
            return DiscordChannel.objects.create(
                url=discord_url,
                name=name)
    return DiscordChannel.objects.get(pk=1)


def save_img_from_file_to_model(event_model, file_path):
    # TODO
    pass


def send_discord_message_about_event(discord_endpoint, event):
    # TODO make the message more rich like there https://gist.github.com/Birdie0/78ee79402a4301b1faf412ab5f1cdcf9
    data = {
        "content" : f"Test message about an event that you have been subscribed for coming on {event.date}",
        "username" : "wydarzen.io",
    }

    #leave this out if you dont want an embed
    #for all params, see https://discordapp.com/developers/docs/resources/channel#embed-object
    data["embeds"] = [
        {
            "description" : event.description,
            "title" : event.title,
            "url": f"http://localhost:3000/events/{event.id}",
            "color": 4405450
        }
    ]

    result = requests.post(discord_endpoint, json = data)

    try:
        result.raise_for_status()
    except requests.exceptions.HTTPError as err:
        print(err)
    else:
        print("Payload delivered successfully, code {}.".format(result.status_code))
