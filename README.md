# Elvira Kurzmann Website

This is a website I have built for my mother, with [Create React App](https://github.com/facebook/create-react-app).
She's a painter and I wanted to offer her a simple way to present her art online.

The website automatically fetches her pictures from [her Instagram Account](https://www.instagram.com/elvirakurzmann) and displays the pictures she uploaded there.

Pictures get sorted by number of Instagram likes (descending) on the website and certain description data automatically gets parsed and nicely presented on the website - if available:

- The first line in a Instagram picture description automatically corresponds to the picture title on the website
- Further things (like painting dimensions and type for instance) also get retrieved via Regex, as long as the description contains them (certain syntax required of course).

To get a better picture [just visit her website](https://www.elvira-kurzmann.at) and click on one of the pictures, to view its details.
There you will see the title and - for some pictures - also further details/properties.

_I hope you enjoy her art - if so, let her know - it would make her day!_
