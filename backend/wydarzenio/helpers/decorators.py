from wydarzenio.models import ScrapperSingleton
from datetime import datetime, timedelta, timezone


def limit_scraping(scrapping_func):
    """
    Limit calling scrapper function, so it will limit calls to 3rd party sites. 
    Limit of calling a website is saved to ScrapperSingleton object and is dynamically updated.
    """
    log_object = ScrapperSingleton.objects.all()[0]
    time_diff = datetime.now(timezone.utc) - log_object.last_call

    if time_diff > timedelta(minutes=log_object.minutes_limit):
        def inner(*args, **kwargs):
            ret = None
            try:
                ret = scrapping_func(*args, **kwargs)
            except Exception as e:
                print(e)
            finally:
                log_object.update_object(args[0], success=ret is not None)
                return ret
        return inner
    else:
        def inner(*args):
            print(f"[INFO] Scrapping aborted for {args[0]}. "
                  f"Elapsed {time_diff} of {timedelta(minutes=log_object.minutes_limit)}")
        return inner


if __name__ == "__main__":
    pass
