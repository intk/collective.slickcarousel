# -*- coding: utf-8 -*-
from plone.app.layout.viewlets import ViewletBase
from .slideshow import ISlideshow
from plone.app.uuid.utils import uuidToCatalogBrain
from AccessControl import getSecurityManager
from Products.CMFCore.permissions import ModifyPortalContent

class SlideshowViewlet(ViewletBase):
    """ A simple viewlet which renders slideshow """
    def checkUserPermission(self):
        sm = getSecurityManager()
        if sm.checkPermission(ModifyPortalContent, self.context):
            return True
        return False

    def checkObjectOnDisplay(self):
        if self.context.portal_type == "Object":
            try:
                brain = uuidToCatalogBrain(self.context.UID())
                return brain.object_on_display
            except:
                return False
        else:
            return False

    def slideshow(self, parent):
        """
        Creates a slideshow with the media from parent
        """

        uuid = self.context.UID()
        context = self.context
        brain = uuidToCatalogBrain(uuid)
        lead_media = getattr(brain, 'leadMedia', None)


        try:
            inContext = 'slideshow' in parent
        except:
            inContext = False
            parent = self.context
            pass

        if inContext:
            parentURL = parent['slideshow'].absolute_url()
        else:
            parentURL = parent.absolute_url()
        
        if not lead_media:
            structure = """
                <div class="slick-slideshow empty" data-audio='' data-audio-duration=''>
                    <a href="%s?recursive=true" id='slide-get-content'></a>    
                </div>
                """%parentURL
        else:
            lead_image = uuidToCatalogBrain(lead_media)
            obj_type = getattr(parent, 'portal_type', None)
            if obj_type == "Object":
                if self.checkUserPermission():
                    structure = """
                        <div class="slick-slideshow regular fullscreen">
                            <a href="%s?recursive=true" id='slide-get-content'></a>    
                            <script>
                                $('body').addClass('not-empty-slideshow');
                            </script>
                        </div>
                        """%parentURL
                else:
                    structure = """
                        <div class="slick-slideshow fullscreen">
                            <a href="%s?recursive=true" id='slide-get-content'></a>    
                            <script>
                                $('body').addClass('not-empty-slideshow');
                            </script>
                        </div>
                        """%parentURL

            elif obj_type == "Collection" or obj_type == "Folder":
                slideshow_type = "collection"
                if not lead_image:
                    # Could not find object
                    #raise RuntimeError(u"Could not look-up UUID:", uuid)
                    pass
                else:
                    absolute_url = lead_image.getURL()
                    scale = "large"
                    structure = """<div class="slick-slideshow %s">
                        <div><div class="inner-bg"><img src="%s/@@images/image/%s"/></div></div>
                        <script>
                            $('body').addClass('not-empty-slideshow');
                        </script>
                        </div>""" % (slideshow_type, absolute_url, scale)
                    return structure
            else:
                structure = """
                <div class="slick-slideshow regular">
                    <a href="%s?recursive=true" id='slide-get-content'></a>    
                    <script>
                        $('body').addClass('not-empty-slideshow');
                    </script>
                </div>
                """%parentURL

        return structure

    def slideshowInContext(self, parent, request):

        inContext = False
        if 'folder_contents' in request:
            return inContext
        try:
            if ISlideshow.providedBy(parent):
                return True

            inContext = 'slideshow' in parent
            return inContext
        except:
            return inContext

    def update(self):
        self.available = True
