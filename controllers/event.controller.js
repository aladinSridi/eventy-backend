const Event = require('../models/event.model');


exports.event_list = function (req, res, next) {
    Event.find({}, function (err, events) {
        if (err) return next(err);
        res.send(events);
    });
};



exports.event_details_by_id = function (req, res, next) {
    Event.findById(req.params.id, function (err, event) {
        if (err) return next(err);
        res.send(event);
    });
};



exports.event_details_latest = function (req, res, next) {
    Event.findOne().sort('-created_at').exec(function(err, event) {
        if (err) return next(err);
        res.send(event);
    });
};



exports.event_details_trending = function (req, res, next) {
    Event.find().sort('-attendeesLength').limit(3).exec(function(err, event) {
        if (err) return next(err);
        res.send(event);
    });
};



exports.event_details_closest = function (req, res, next) {
    Event.find({country : req.params.country}).sort('-attendeesLength').limit(1).exec(function(err, event) {
        if (err) return next(err);
        res.send(event);
    });
};


exports.event_details_upcoming = function (req, res, next) {
    var today = new Date(); 
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) {dd='0'+dd;} 
    if(mm<10) {mm='0'+mm;} 

    today = yyyy+'/'+mm+'/'+dd;
    Event.find({date :{$gte: today}}).sort('date').limit(1).exec(function(err, event) {
        if (err) return next(err);
        res.send(event);
    });
};




exports.event_details_random = function (req, res, next) {
    Event.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
    
        Event.findOne().skip(random).exec(
        function (err, event) {
            if (err) return next(err);
            res.send(event);
        });
    });
};



exports.event_update = function (req, res,next) {
    Event.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        if (err) return next(err);
        res.send('Event Udpated successfully!');
    });
};



exports.event_delete = function (req, res) {
    Event.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Event Deleted successfully!');
    });
};



exports.event_create = function (req, res, next) {  
    let event = new Event(
        {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            country : req.body.country,
            category : req.body.category,
            cost: req.body.cost,
            infoline: req.body.infoline,
            organizer: req.body.organizer,
            created_by : req.body.created_by,
            created_at : req.body.created_at,
            attendees: req.body.attendees,
            attendeesLength: req.body.attendeesLength,
            picture : req.body.picture
        }
    );

    event.save(function (err, savedEvent) {
        if (err) return next(err);
        res.send(savedEvent);
    });

};



exports.event_search = function (req, res, next) { 
    var tab= {};

    /** conversion des variables avec le fct RegExp  **/
    const title = new RegExp(escapeRegex(req.body.title), 'gi');
    const category = new RegExp(escapeRegex(req.body.category), 'gi');
    const country= new RegExp(escapeRegex(req.body.country), 'gi');
    const cost = new RegExp(escapeRegex(req.body.cost), 'gi');
    const date = new RegExp(escapeRegex(req.body.date), 'gi');
    
    /** test sur les champs selectionnees **/
    if(req.body.title) tab['title']= title;
    if(req.body.category) tab['category']= category;
    if(req.body.country) tab['country']= country;
    if(req.body.cost) tab['cost']= cost;
    if(req.body.date) tab['date']= date;
    
    /** recherche dans bd **/
    Event.find(tab, function(err, results) {
        if (err) return next(err);
        res.send(results);
    });
}

/** fonction pour remplacer les esp et les caracteres spec **/
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
/**  **/



exports.event_recommended = function (req, res, next) { 
    console.log(req.body) 
    filter = {}

    /* Selecting Country */
    /* Passively */
    filter["country"] = []
    if (req.body.locOfVisits == "Tunis") {
        filter["country"] = ['ariana','béja','ben arous','bizerte','gabès','gafsa','jendouba','kairouan','kasserine', 'kebili','kef','mahdia', 'manouba', 'medenine', 'monastir','nabeul','sfax','sidi bouzid', 'siliana','sousse','tataouine', 'tozeur','tunis','zaghouan']
    }
    if (req.body.locOfVisits == "Algiers") {
        filter["country"] = ['algiers','oran','constantine','annaba','blida']
    }
    /* Actively */
    if(req.body.filtredLocations) {
        filter["country"] = req.body.filtredLocations.split(":")
    }




    /* Selecting Categories */
    filter["category"] = []

    /* Actively */
    if(req.body.filtredCategories) {
        filtredCategories = req.body.filtredCategories.split(":")
        filter["category"] = filter["category"].concat(filtredCategories);
    }

    /* Passively */
    enfant = ['games', 'entertainement']                                                    // <-- To be changed according to our chosen categories
    worker = ['proffessional', 'selfdev']                                                   // <-- To be changed according to our chosen categories
    student = ['formation', 'entertainement']                                               // <-- To be changed according to our chosen categories
    developer = ['IT']                                                                      // <-- To be changed according to our chosen categories
    gamer = ['games']                                                                       // <-- To be changed according to our chosen categories
    microsoft = []                                                                          // <-- To be changed according to our chosen categories
    apple = []                                                                              // <-- To be changed according to our chosen categories
    android = []                                                                            // <-- To be changed according to our chosen categories

    /* Only Comes at weekends : Worker = Enfant > Student */
    /* Never Comes at weekends : Not a worker + Not Enfant = Freelancer */
    weekdays = 0;
    weekends = 0;
    daysOfVisits = req.body.daysOfVisits.split(':');
    daysOfVisits.forEach(element => {
        if(element > 0 && element < 6)  {
            weekdays = weekdays+1;
        } else {
            weekends = weekends+1;
        }
    }); 

    /* Only comes between (18-8): Worker = Enfant = Student */
    /* Does not come after 22:00 : Enfant */
    /* Comes between (00-6): Student or None */
    midday = 0;
    dayend = 0;
    comesAfter22 = false;
    between006 = 0;
    hoursOfVisits = req.body.hoursOfVisits.split(':');
    hoursOfVisits.forEach(element => {
        if(element > 6 && element < 18)  {
            midday = midday+1;
        } else {
            dayend = dayend+1;
        }
        if(element < 6 && element > 0)  {
            between006 = between006+1;
        }
        if(element > 22) {
            comesAfter22 = true;
        }
    }); 
    


    if(weekends > weekdays + 100 && !comesAfter22)                                              // <-- 100 is a placeholder
    {                                        
        filter["category"] = filter["category"].concat(enfant);                                                   
    } 
    else if (weekends > weekdays + 100 && dayend > midday + 100 && between006 < 3 )             // <-- 100 is a placeholder
    {             
        filter["category"] = filter["category"].concat(worker);                                                                                          
    } 
    else 
    {
        filter["category"] = filter["category"].concat(student);
    }    
    if(req.body.desktop == 'Linux')                                                             /* Uses Linux: Interested in IT */
    {
        filter["category"] = filter["category"].concat(developer);
    }
    if(req.body.gameDevices)                                                                    /* Uses GameDevice: Interested in Games */
    {
        filter["category"] = filter["category"].concat(gamer);
    }
    if(req.body.mobile == "Windows Phone")                                                       /* Uses Windows Phone: Interested in Microsoft */
    {
        filter["category"] = filter["category"].concat(microsoft);
    }
    if(req.body.mobile == "Iphone")                                                              /* Uses Iphone: Interested in Apple */
    {
        filter["category"] = filter["category"].concat(apple);
    }
    if(req.body.mobile == "Android")                                                             /* Uses Android: Interested in Android */
    {
        filter["category"] = filter["category"].concat(android);
    }


    /* Selecting Title and Desctiption*/ 
    if(req.body.filtredKeywords) {
        filter["keywords"] = req.body.filtredKeywords.split(":")
    }


    


    /* DataBase Inquery */
    Event.find({}, function(err, results) {
        if (err) return next(err);
        
        for (let i = results.length-1; i >= 0; i--) {
            /* Country Matching */
            if(filter["country"]){                           
                if(!(filter["country"].includes(results[i].country))) {
                    console.log('- Filtred by country')
                    results.splice(i, 1);
                    continue;
                }
            }

            /* Category Matching */
            if(filter["category"]){
                if(!(filter["category"].includes(results[i].category))) {
                    console.log('- Filtred by category')
                    results.splice(i, 1);
                    continue;
                }
            }


            /* Keyword Matching */
            if(filter["keywords"]) {
                var commonWords = ['i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www'];
                var text = results[i].title;
                text = text.toLowerCase();
                text = text.replace(/[^\w\d ]/g, '');
                var result = text.split(' ');
                result = result.filter(function (word) {return commonWords.indexOf(word) === -1;});

                var titleArray = result.filter((v, i, a) => a.indexOf(v) === i);
                var kwMatch = 0;
                
                titleArray.forEach(element => {
                    if(filter["keywords"].includes(element)){
                        kwMatch = kwMatch + 1;
                    }
                });
                if(kwMatch < (titleArray.length / 2)+1) {
                    console.log('- Filtred by Keyword')
                    results.splice(i, 1);
                    continue;
                }
            }
        }
    
        res.send(results);
    });
}