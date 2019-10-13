

var app = new Vue({

    el: "#app",

    data: {
        beers: [],
        searchBox: "",
        message:"Book not found!"
    },

    created() {
        this.logic();
    },


    methods: {
        async logic() {
            var url = "https://api.punkapi.com/v2/beers"

            this.beers = await fetch(url, {
                method: "GET",
            })
                .then(response => response.json())
                .then(data => data)
                .catch(error => console.log(error));

                // this.name = this.beers.map((el) => el.name).join(' ');
               
            console.log(this.beers)

           
        },
    },

    computed: {
        filteredBeers: function () {
            return this.beers.filter((beer) => {
                console.log(beer.name)
                var searchTerm=this.searchBox.toLowerCase();
                var isBeerNameMatching=beer.name.toLowerCase().match(searchTerm);
                 var isDescriptionMatching=beer.description.toLowerCase().includes(searchTerm);

                 var isIngredientsMaltMatching=beer.ingredients.malt.map(el=>el.name.toLowerCase()).includes(searchTerm);
                 var isIngredientsHopstMatching=beer.ingredients.hops.map(el=>el.name.toLowerCase()).includes(searchTerm);
                 var isIngredientYeastMatching=beer.ingredients.yeast.toLowerCase().match(searchTerm);
                 var isIngredientsMatching=isIngredientsMaltMatching || isIngredientsHopstMatching || isIngredientYeastMatching;


                 var isSearchBoxEmpty=this.searchbox == "";

                return isBeerNameMatching || isDescriptionMatching|| isIngredientsMatching|| isSearchBoxEmpty;
                
            });
        }
    }



})

