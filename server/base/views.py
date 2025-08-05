import os
from django.http import Http404, FileResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required
# from django.utils.encoding import smart_str


@login_required
def protected_media(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)

    if not os.path.exists(file_path):
        raise Http404("File does not exist.")

    return FileResponse(open(file_path, "rb"), content_type="application/octet-stream")
