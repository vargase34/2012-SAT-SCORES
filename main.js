new Vue({   //the heart of vue
    el: '#app', //vue is used on id known as "app" on our html
    data() {
        return {
            array_schools: [], //this will contain our API data ("info")
            specific_school: [],    //this will contain the user input school info
        }
    },
    mounted() { //this program uses AJAX to .GET the JSON and convert each object into javascript arrays
        axios
            .get('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')   //get from the API website
            .then(response => (this.array_schools = response.data))  //parse the response into "info" in our vue
            .catch(error => console.log(error)) //if theres an error, log it onto the console
    },
    methods: {
        //function declared
        save_school_name: function () {
            //below is used to extract what the user typed or when the user clicked submit and stores it into users_school
            var users_school = document.getElementById("user_input").value;
            this.specific_school.school_name = "";
            //this for loop is used to search through the whole JSON
            for (var i = 0; i < this.array_schools.length; i++) {
                // IF the user input matches any school from the list ....
                if (this.array_schools[i].school_name === users_school) {
                    //  record that specific array into a new object called specific_school
                    this.specific_school = this.array_schools[i];
                    //these if statements below is used to find what borough the school is from. the format from the json was like 01M123. these if statements find the M to determine the school is located in Manhattan.
                    if (this.specific_school.dbn.charAt(2) === "M") {
                        this.specific_school.dbn = this.specific_school.school_name + " is located in Manhattan.";
                    }
                    //X for Bronx
                    else if (this.specific_school.dbn.charAt(2) == "X") {
                        this.specific_school.dbn = this.specific_school.school_name + " is located in the Bronx.";
                    }
                    //K for brooklyn
                    else if (this.specific_school.dbn.charAt(2) === "K") {
                        this.specific_school.dbn = this.specific_school.school_name + " is located in Brooklyn.";
                    }
                    //Q for queens
                    else if (this.specific_school.dbn.charAt(2) === "Q") {
                        this.specific_school.dbn = this.specific_school.school_name + " is located in Queens.";
                    }
                    //R for staten island
                    else if (this.specific_school.dbn.charAt(2) === "R") {
                        this.specific_school.dbn = this.specific_school.school_name + " is located in Staten Island.";
                    }
                    //the code below is used to add additional text infront of the elements of the array for context
                    this.specific_school.num_of_sat_test_takers += " students took the SAT.";
                    this.specific_school.sat_critical_reading_avg_score += " was the average critical reading score.";
                    this.specific_school.sat_math_avg_score += " was the average math score.";
                    this.specific_school.sat_writing_avg_score += " was the average writing score.";
                }
            }
        },
    },
});

function change_light() {
    var element = document.getElementById("body");
    if (element.classList) {
        element.classList.toggle("text-white bg-dark");
    }
    else {
        var classes = element.className.split("text-dark");
        var i = classes.indexOf("text-white bg-dark");
        if (i >= 0) {
            classes.splice(i, 1);
        }
        else {
            classes.push("text-white bg-dark");
            element.className === classes.join("test-dark");
        }
    }
}

/*KNOWN BUGS
when user clicks submit in succession, the text repeats
the boroughs were sometimes incorrect. however, this may be fixed with the addition of the "else ifs" rather than just if
-FIXED: Added code that empties the element "school_name" in array "specific_school". this makes it so that the dbn is filled in new every time rather than using school_name to find the borough
***
*/