function CalendarItem(calID, startDate, endDate, jsStartDate, jsEndDate, allDay, title, location, openURL, webNodeImg) {
    this.calID = calID;
    this.startDate = startDate;
    this.endDate = endDate;
    this.jsStartDate = jsStartDate;
    this.jsEndDate = jsEndDate;
    this.allDay = allDay;
    this.title = title;
    this.location = location;
    this.openURL = openURL;
    this.webNodeImg = webNodeImg;
    this.eventKey = '';

    this.getCalID = function(){
        return this.calID;
    }

    this.getStartDate = function(){
        return this.startDate;
    }

    this.getEndDate = function(){
        return this.endDate;
    }
    
    this.getJsStartDate = function(){
        return this.jsStartDate;
    }

    this.getJsEndDate = function(){
        return this.jsEndDate;
    }
    
    this.allDay = function(){
        return this.allDay;
    }

    this.getTitle = function(){
        return this.title;
    }
    
    this.getLocation = function(){
        return this.location;
    }
    
    this.getOpenURL = function(){
        return this.openURL;
    }
    
    this.getWebNodeImg = function(){
        return this.webNodeImg;
    }
    
    this.getEventKey = function(){
        return this.eventKey;
    }
    
    this.setEventKey = function(eventKey){
        this.eventKey = eventKey;
    }
}

var Events = {
    eventsByID  : new Array(),
    eventsByKey : new Array(),
    eventsByLabel : new Array(),

    addEvent : function( event, key, label ) {
        var id = event.getCalID();

        if (!this.eventsByKey[key]) {
            this.eventsByKey[key] = new Array();
        };
        
        if (!this.eventsByLabel[label]) {
            this.eventsByLabel[label] = new Array();
        };
        
        event.setEventKey(key);
        
        this.eventsByID[id] = event;
        this.eventsByKey[key].push(event);
        this.eventsByLabel[label].push(event);
    },
    
    getEventByID : function(theID) {
        if ( this.eventsByID[theID] ) {
            return this.eventsByID[theID];
        } else {
            return new Array();
        }
    },
    
    getEventsByKey : function(key) {
        if ( this.eventsByKey[key] ) {
            return this.eventsByKey[key];
        } else {
            return new Array();
        }
    },
    getEventsByLabel : function(label) {
        if ( this.eventsByLabel[label] ) {
            return this.eventsByLabel[label];
        } else {
            return new Array();
        }
    }
}
