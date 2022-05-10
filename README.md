# Urban Agriculture Data Tool
The Urban Agriculture Data Tool is a project that aims to centralize and display data on the small and medium-scale urban agriculture operations in Prince George’s County. It currently consists of a website that allows farm registration and allows users to search for farms based on certain search parameters. This website is hosted on Heroku and can be accessed [here](https://team-go-green.herokuapp.com/). The data displayed on this website is stored on a MySQL database which is also hosted through Heroku using ClearDB

## Link to website
https://team-go-green.herokuapp.com/

## Features for Future Development
* Accounts can be made but this should be for demonstration purposes ONLY. There is no security on the accounts and passwords would be very easy to find. Implementing proper account security should be prioritized before distributing the website
* It would be best to replace the Access Token with a new personal one to ensure full access to the map. Here is detailed information on how to create the Access Token. After the token is created, go into the file data-script.js file within the Data Tool folder in the Client folder, and replace the value for the variable ‘accessToken’ within the quotes on line 1 with the new access token created. This allows for total customization of the map as well as you now have full access to the map.
* There is currently no zoning information. A feature on the map that lines out each agricultural zone in Prince George’s county and lists what is allowed in each zone would make the website more robust
* The images on the website are currently placeholders as we do not have a server to host images that are uploaded by users. In the future, there should be a way for users to upload their own images on to the website
* Currently, the database is hosted on the free Ignite tier of ClearDB. This has limitations in both size and speed. Once the database starts nearing the size cap for the tier, it may slow down, causing the website to slow down, and may even prevent you from inputting more data. Should this problem occur, the DB can be migrated to some other server.
* The database itself is not very secure


## Developer Manual
### How to Install the Application and all Node Module Dependencies
1. Clone the [Repository](https://github.com/KamranDjourshari24/490DataTool) via GitHub Desktop or the Terminal of your OS
2. Open the directory, where the repository is stored, in VSCode's Terminal or your OS's Terminal
3. Run ```npm install```

### How to Run the Application Locally
1. Open the directory, where the repository is stored, in VSCode's Terminal or your OS's terminal
2. Run ```npm start```
3. In your desired web browser, enter the following URL to view the Application: `http://localhost:3000/`

### API Guide
```/api/urbanfarms``` - Route for information about urban farms
* GET: Retrieves all records in the urban_farms table
* PUT: Updates records in urban_farms table based on the farm name given
* POST: Inserts records into urban_farms table
* DELETE: Deletes records from urban_farms table based on farm name

```/api/urbanfarms/:farm_name``` - Route for information about urban farms for a single farm determined by ```:farm_name```
* GET: Retrieves a single farm from the urban_farms table

```/api/farms_products``` - Route for product information for each farm
* GET: Retrieves all records in the farms_products table
* PUT: Updates records in farms_products table based on a certain farm
* POST: Inserts records into farms_products table
* DELETE: Deletes records from farms_products table based on a certain farm

```/api/farms_products/:farm_name``` - Route for product information for a single farm determined by ```:farm_name```
* GET: Retrieves products from a single farm
* PUT: Updates a product for a single farm
* POST: Adding a new product for a single farm

```/api/products``` - Route for all products
* GET: Retrieves all records in the products table
* PUT: Updates records in products table based on a certain farm
* POST: Inserts records into products table
* DELETE: Deletes records from products table based on a certain farm

```/api/owners``` - Route for all owners
* PUT: Updates owners based on the owner_id
* POST: Inserts owners into owners table
* DELETE: Deletes owners based on owner_id

```/api/thirdPartyAPI``` - Route in order to create latitude and longitude values based on address
* PUT: Sends a response which are coordinates based on the address and city inputted



## Website
This website allows farms to register and create a customized profile that will display easily accessible information about their operation such as their location, what products they are producing and in what quantities, and a link to their website if they have one. This data is searchable based on the data in their profile and focuses on giving users a list of the farms closest to them meeting their search parameters. The website is built primarily through JavaScript, HTML, and CSS, and uses Bulma and Bootstrap frameworks. Maps are built using MapBox’s Leaflet using our own registered Access Token from Mapbox’s website.     

### Home Page
This page is the first page that the user will land on. There is a slideshow at the top that cycles through different articles about urban agriculture, so a user who wants to learn more has access to resources that may be useful to them. Under this slideshow is the featured farms, which are a randomized set of 3 farms in order to give them exposure on the front page. Lastly, below that is the mission statement, which reflects the mission of the Prince George’s County University of Maryland Extension.

### Search Page
This page can be accessed by clicking “Search” on the navigation bar. It contains a map and search fields where a user can enter whatever they want to search for. Currently they can search by farm name, city, or zipcode, or all 3. Any field can be left out of the search if needed. Once the “Submit” button is pressed, farms will show up that match the search, and these farms will also show up on the map.

### Details
If a user were to click on “Learn more” on any of the farms, they will be taken to the details page of that farm. This page contains more information  about the farm not shown on the search page such as contact and product information. It also provides a gallery of images provided by the owner of the farms account. 

### Registration
The registration page allows for a user to potentially sign up for an account, where they will input information about their farm. This page as of right now allows for data to be inputted and sent to the database so the farm can show up on the website, but the account itself will not be created. 

### Profile
When a user is logged in, the profile will be where the user can see and edit their information. This page is similar to the details page and also leads to the inventory page.

### Inventory
This page acts as an inventory management system for the farm. Here they can edit the amount of the product they have in stock, how that product is measured, and if that product is in stock or not. 

### Contact Us
Here, a user can enter their contact information and put in a comment or concern. This will be sent to the email of whoever is managing the website so they can view user concerns/feedback.

## Database
The database used to hold information for this project is a MySQL relational database and is hosted on Heroku using ClearDB. This database is meant to contain data about each farm as well as the products that each farm provides.


### Features
The database contains 4 tables that hold information regarding farms on the website

![Database ERD](../490DataTool/client/images/Screenshot%202022-05-09%20201149.png)

* Urban_farms
    * Holds general information on the farm as a whole. Generally, this is information that is shown on the details page
* Owner
    * Holds information about the owner of the account including username and password
* Farms_products
    * Holds information about products on each farm
* Products
    * Holds information about all products that exist on the website

### Altering Data
Changing the data in the database should be done primarily on the website. However, if you need to go directly in the database to change any data, you can log in to the database on MySQL Workbench. Through the SQL programming language, one would be able to manipulate the data. However, these changes are permanent so please be very cautious with any changes. 

### Backing-up Data
Having a back-up of the data is important as a failsafe just in case anything goes wrong with the database. Backups should be made periodically as new data is added. Currently, the only way to back up the database is manually through MySQL.




