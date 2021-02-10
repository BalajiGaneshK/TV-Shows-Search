//Fetching Show Details from API
async function getTVShowDetails(search) {
    
    let url = "http://api.tvmaze.com/search/shows?q=" + search;
    let response = await fetch(url);
    let data = await response.json();
    return data ;

}

//Display Search Results

function displaySearchResults(tvShowData) {

    
    //Clearing the div containing previous search results

    let searchResultsContainer= document.getElementById("search-results");  //div containing search results
    while (searchResultsContainer.firstChild)
    {
        searchResultsContainer.removeChild(searchResultsContainer.lastChild);

    }
    
    for (let i = 0; i < tvShowData.length; i += 3)
    {
        let row = document.createElement("div");
        row.setAttribute("class", "row mt-4");

        //Appending each row to the searchResultsContainer
        
        searchResultsContainer.append(row);

        let col;

        //Generating the columns and appending to respective row
       
        for (let j = i; j <= (i + 2) && j<tvShowData.length; j++)
        {

            //3 col generated in a loop and appended to 1 row
            col = document.createElement("div");
            col.setAttribute("class", "col-6 col-lg-3  p-3  ");   
            col.style = "margin-left:7%; border-radius:5%; border:solid 2px black; background-color:yellow ";
            row.append(col);

            //Each tvShow's detail stored
            let tvShowDetails = tvShowData[j].show;
            
            console.log("Show",j,tvShowDetails);

            //TV Show details 
            let bannerURL;
            let name;
            let genres;
            let timings;
            let streamingChannel;
            
            //getting bannerURL
            if (tvShowDetails.image !== null)
                bannerURL = tvShowDetails.image.medium;
            
            else
                bannerURL = "https://picsum.photos/200/300";
            
            //A div containing all details of TV show
            let tvShowCard = document.createElement("div");
            col.append(tvShowCard);

            //Adding banner image 
            let image = document.createElement("img");
            image.src = bannerURL;
            image.style = "margin-left:8%";
            tvShowCard.append(image);
            
            //Adding TV Show name
            name = tvShowDetails.name;
            let nameBox = document.createElement("div");
            nameBox.innerHTML = name;
            nameBox.style="font-size:1.5rem; font-weight:500; text-align:center;"
            tvShowCard.append(nameBox);
            
            //Adding genres
            genres = tvShowDetails.genres;

            if (genres.length === 0)
                genres = tvShowDetails.type;
            
            let genreBox = document.createElement("div");
            genreBox.innerHTML = "<b>Genre: &nbsp; &nbsp;</b>";

            for (let x = 0; x < genres.length; x++)
            {
                if (x > 0 && tvShowDetails.genres.length!==0)
                    genreBox.innerHTML += ",";
                
                genreBox.innerHTML += genres[x];
            }
            tvShowCard.append(genreBox);

            //Adding timings

            timings = tvShowDetails.schedule;
            let scheduleBox = document.createElement("div");
            scheduleBox.innerHTML = "<b>Schedule: &nbsp;</b>";
            
            for (let x = 0; x < timings.days.length; x++)
            {
                 if (x > 0 )
                    scheduleBox.innerHTML += ",";
                
                scheduleBox.innerHTML += timings.days[x] ;
            }
            
            scheduleBox.innerHTML += "&nbsp;" + timings.time;
            scheduleBox.style="overflow-wrap:break-word;"
            tvShowCard.append(scheduleBox);
            
            


            
            
            
            

            
            
               
            
            

       




        }

        


    
    }



}

//Get Search value from HTML 
async function fetchShowSearch(e) {

    let searchValue= document.getElementById("showSearch").value;

    let tvShowData = await getTVShowDetails(searchValue);
    //console.log(tvShowData);
    displaySearchResults(tvShowData);
    

}