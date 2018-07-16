## mongo commands
* db.stats() (stats)
* use simulator (creates one if does not exist)
* db  (shows which db) 
* show dbs
* show collections
* db.dropDatabase()     (drops database)
* db.collections.drop()  ( drop the collections)
* db.simulator.insert( {"name": "service1" } )  (inserts document in simulator collection)
* db.simulator.insert([{}, {}])     (multiple documents at the same time.)
* db.simulator.save()  - with id will update and without will insert.
* To find
    * db.simulator.find()
    * db.simulator.find().pretty()
    * db.simulator.find({},{name:1, map:1})  ( select only some fields.)
    * db.simulator.find({},{name:1, map:1}).limit(10)
    * db.simulator.find({},{name:1, map:1}).limit(10).skip(1)       (skips the first document.)
    * db.simulator.find().sort({name:1})
    
* Update
    * db.simulator.update( {'name': 'service1'}, {$set:{'name':'service2'}},{multi:true})
* Save
    * by id
        * db.simulator.save( {"_id": ObjectId("5b4d045228b1ea0d36a8751c"), "name"  : "service3", "map" : "maphere" } )
* Remove
    * db.simulator.remove( { "name" : "service2"} )
    * db.simulator.remove()   (removes all documents)
* Indexing
    * db.simulator.ensureIndex()