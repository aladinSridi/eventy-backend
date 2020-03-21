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
    Event.findOne().sort('-attendeesLength').exec(function(err, event) {
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



exports.event_create = function (req, res, next) {  
    let event = new Event(
        {
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            cost: req.body.cost,
            infoline: req.body.infoline,
            organizer: req.body.organizer,
            invitees: req.body.invitees,
            inviteesLength : req.body.inviteesLength,
            attendees: req.body.attendees,
            attendeesLength: req.body.attendeesLength,
            created_at : req.body.created_at,
            country : req.body.country,
            created_by : req.body.created_by,
            qrcodetxt : req.body.qrcodetxt
        }
    );

    event.save(function (err, savedEvent) {
        if (err) return next(err);
        res.send(savedEvent);
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



 /**fonction pour remplacer les esp et les caracteres spec */
 function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


 /**fct recherche filtre */
 exports.event_search = function (req, res) {

    /**conversion des variables avec le fct RegExp  */
       var noMatch = null;
      const title= new RegExp(escapeRegex(req.body.title), 'gi');
      const cat = new RegExp(escapeRegex(req.body.category), 'gi');
      const country= new RegExp(escapeRegex(req.body.country), 'gi');
      //const cost = new RegExp(escapeRegex(req.body.cost), 'gi');
      const date = new RegExp(escapeRegex(req.body.date), 'gi');
      var tab= {};
    /**test sur les champs selectionnees */
    if( (req.body.title) && (req.body.category) && (req.body.country) && (req.body.cost) && (req.body.date) ){
      tab['title']= title;
      tab['category']= cat;
      tab['country']= country;
      tab['cost']= req.body.cost;
      tab['date']= date;

    }else if( (req.body.title) && !(req.body.category) && !(req.body.country) && !(req.body.cost) && !(req.body.date) ){
      tab['title']= title;
    }
    else if( (req.body.title) && (req.body.category) && !(req.body.country) && !(req.body.cost) && !(req.body.date) ){
      tab['title']= title;
      tab['category']= cat;
    }
    else if( (req.body.title) && !(req.body.category) && (req.body.country) && !(req.body.cost) && !(req.body.date) ){
      tab['title']= title;
      tab['country']= country;
    }
    else if( (req.body.title) && !(req.body.category) && !(req.body.country) && (req.body.cost) && !(req.body.date) ){
      tab['title']= title;
      tab['cost']= req.body.cost;
    }
    else if( (req.body.title) && !(req.body.category) && !(req.body.country) && !(req.body.cost) && (req.body.date) ){
      tab['title']= title;
      tab['date']= date;
    }
    else if( !(req.body.title) && (req.body.category) && !(req.body.country) && !(req.body.cost) && !(req.body.date) ){
            tab['category']= cat;
    }
    else if( !(req.body.title) && (req.body.category) && (req.body.country) && !(req.body.cost) && !(req.body.date) ){
      tab['country']= country;
      tab['category']= cat;
    }
    else if( !(req.body.title) && (req.body.category) && !(req.body.country) && (req.body.cost) && !(req.body.date) ){
      tab['cost']= cost;
      tab['category']= cat;
    }
    else if( !(req.body.title) && (req.body.category) && !(req.body.country) && !(req.body.cost) && (req.body.date) ){
      tab['date']= date;
      tab['category']= cat;
    }
    else if( !(req.body.title) && !(req.body.category) && (req.body.country) && (req.body.cost) && !(req.body.date) ){
      tab['cost']= req.body.cost;
      tab['country']= country;
    }
    else if( !(req.body.title) && !(req.body.category) && (req.body.country) && !(req.body.cost) && (req.body.date) ){
      tab['date']= date;
      tab['country']= country;
    }
    else if( !(req.body.title) && (req.body.category) && !(req.body.country) && !(req.body.cost) && !(req.body.date) ){
           tab['category']= cat;
    }
    else if( !(req.body.title) && !(req.body.category) && (req.body.country) && !(req.body.cost) && !(req.body.date) ){
      tab['country']= country;
    }
    else if( !(req.body.title) && !(req.body.category) && !(req.body.country) && (req.body.cost) && !(req.body.date) ){
      tab['cost']= req.body.cost;
    }
    else if( !(req.body.title) && !(req.body.category) && !(req.body.country) && !(req.body.cost) && (req.body.date) ){
      tab['date']= date;
    }
    else if( (req.body.title) && (req.body.category) && (req.body.country) && !(req.body.cost) && !(req.body.date) ){
      tab['title']= title;
      tab['category']= cat;
      tab['country']= country;

    }
    else if( (req.body.title) && (req.body.category) && !(req.body.country) && (req.body.cost) && !(req.body.date) ){
      tab['title']= title;
      tab['category']= cat;
      tab['cost']= req.body.cost;

    }
    else if( (req.body.title) && (req.body.category) && !(req.body.country) && !(req.body.cost) && (req.body.date) ){
      tab['title']= title;
      tab['category']= cat;
      tab['date']= date;
    }
    else if( (req.body.title) && !(req.body.category) && (req.body.country) && (req.body.cost) && !(req.body.date) ){
      tab['title']= title;
      tab['cost']= req.body.cost;
      tab['country']= country;

    }
    else if( (req.body.title) && !(req.body.category) && (req.body.country) && !(req.body.cost) && (req.body.date) ){
      tab['title']= title;
      tab['date']= date;
      tab['country']= country;

    }
    else if( (req.body.title) && !(req.body.category) && !(req.body.country) && (req.body.cost) && (req.body.date) ){
      tab['title']= title;
      tab['cost']= req.body.cost;
      tab['date']= date;

    }
    else if( !(req.body.title) && (req.body.category) && (req.body.country) && (req.body.cost) && !(req.body.date) ){
      tab['category']= cat;
      tab['cost']= req.body.cost;
      tab['country']= country;

    }
    else if( !(req.body.title) && (req.body.category) && (req.body.country) && !(req.body.cost) && (req.body.date) ){
      tab['category']= cat;
      tab['date']= date;
      tab['country']= country;

    }
    else if( !(req.body.title) && (req.body.category) && !(req.body.country) && (req.body.cost) && (req.body.date) ){
      tab['category']= cat;
      tab['cost']= req.body.cost;
      tab['date']= date;

    }
    else if( !(req.body.title) && !(req.body.category) && (req.body.country) && (req.body.cost) && (req.body.date) ){
      tab['country']= country;
      tab['cost']= req.body.cost;
      tab['date']= date;

    }
    
    /**recherche dans bd */
    
      db.collection("event").find(tab, function(err, results) {
        if(err){
               console.log(err);
           } else {
               console.log(results)
              if(results.length < 1) {
                  noMatch = "No events match that body, please try again.";
                  // test 
                  //console.log("No events match that body, please try again.")
                   //console.log('fin')
                }
                res.send(results);               
              //res.render("index",{events:results, noMatch: noMatch});

           }
        });
    
  }