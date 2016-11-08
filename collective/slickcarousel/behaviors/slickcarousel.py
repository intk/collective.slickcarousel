# -*- coding: utf-8 -*-
from zope.interface import alsoProvides, implements
from zope.component import adapts
from zope import schema
from plone.supermodel import model
from plone.dexterity.interfaces import IDexterityContainer
from plone.autoform.interfaces import IFormFieldProvider
from plone.app.uuid.utils import uuidToCatalogBrain, uuidToObject
from plone.namedfile import field as namedfile

from plone.app.contenttypes import _

from Acquisition import aq_inner
from zope.component import getUtility
from Products.Five import BrowserView
from Products.CMFCore.utils import getToolByName
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.CMFPlone.interfaces import IPloneSiteRoot
from AccessControl import getSecurityManager
import json


class ISlickCarousel(model.Schema):
    """ Marker interface for a Slick Carousel """
	pass

class SlickCarousel(object):
	implements(ISlickCarousel)
	adapts(IDexterityContainer)

	def __init__(self, context):
		self.context = context

    def get_items(self):
        items = []
        # Check if slideshow exists
        if 'slideshow' in self.context:
            # Get items inside of slideshow
            slideshow = self.context['slideshow']
            catalog = getToolByName(self.context, "portal_catalog")
            slideshow_path = "/".join(slideshow.getPhysicalPath())
            items = catalog(path={"query": slideshow_path, depth: 1})
            for brain in items:
                if brain.leadMedia and brain.portal_type != "Image":
                    img = uuidToCatalogBrain(brain.leadMedia)
                    items.append({"url": img.getURL()})
                elif brain.portal_type == "Image":
                    items.append({"url": brain.getURL()})
            return items
        else:
            return items

# # # # #
# Views #
# # # # #

# # # # # # # # # # # # # # # # # # # # # # # # #
# Details of a single item in the slideshow     #
# # # # # # # # # # # # # # # # # # # # # # # # #

class SlickCarouselItemView(BrowserView):
    """ Class that extracts relevant information for the slideshow
    """
    def getJSON(self):
        return json.dump([])


# # # # # # # # # # # # # # # # # # # #
# Get list of items in the slideshow  #
# # # # # # # # # # # # # # # # # # # #

class SlickCarouselListingView(BrowserView):
    """ Class that extracts relevant information for the slideshow
    """
    def getJSON(self):
        return json.dump([])

