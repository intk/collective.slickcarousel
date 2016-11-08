Features
============

- Adds a slideshow to dexterity folderish types
- Easy to adapt to custom dexterity types
- Uses slick carousel by Ken Wheeler


How it works
============

An administrator can choose which types are upgraded with slideshow functionality by adding a 'slideshow' behaviour via the 'Site Setup’/'Dexterity content types’. A folder named ’slideshow’ appears inside of items with slideshow behaviour. Using drag and drop functionality multiple images can be uploaded to the slideshow folder. A slideshow with the several images appears automatically in the view of any item that contains more than one image in the ‘slideshow' folder. In case the folder contains only one image, the view shows the image but not the next/previous buttons. In case the folder contains no images, the slideshow does not appear in the page.

Videos from YouTube can also be added to the slideshow. Create an item of type link inside the slideshow folder pointing to the video on Youtube. Make sure the URL is a canonic YouTube url.


Dependencies
============

- collective.folderishtypes
- collective.leadmedia


Changelog
============

0.1 (2016-11-08)
-------------------

- Initial release