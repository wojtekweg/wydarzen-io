from ..models import Place


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
