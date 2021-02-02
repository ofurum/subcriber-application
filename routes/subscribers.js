const express = require('express');
const Subscriber = require('../model/subscriberModel');
const router = express.Router();


//getting all routes
router.get('/', async (req, res) =>{
     try{
         const allSubscribers = await Subscriber.find()
         res.status(200).json(allSubscribers)
     } catch(error){
        res.status(400).send({message: error.message});
     }
});
//getting one route
router.get('/:id', getSubscriber, async (req, res) =>{
   res.json(res.subscriber)
});

//creating routes
router.post('/', async (req, res) =>{
    const addSubscriber = new Subscriber({
        name: req.body.name,
        subscribeToChannels: req.body.subscribeToChannels,
    })
        try{
            const successFulCreated = await addSubscriber.save()
            res.status(201).json(successFulCreated)
        }catch(error){
            res.status(400).send({message: error.message});
        }
});

//updating routes
router.patch('/:id', getSubscriber, (req, res) =>{
    if(req.body.name !== null){
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribeToChannels !== null) {
      res.subscriber.subscribeToChannels = req.body.subscribeToChannels;
    }
    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber)
    }catch(error){
        res.status(400).json({message: error.message})
    }
});

//delete route
router.delete('/:id',getSubscriber, async (req, res) =>{
   try{
     await res.subscriber.remove();
     res.json({message: 'Deleted Subscriber'})
   }catch(error){
      res.status(500).json({message: error.message})
   }
})

async function getSubscriber(req, res, next) {
    let subscriber;
    try{
         subscriber = await Subscriber.findById(req.params.id)
         if(subscriber == null){
             return res.status(404).json({message: 'Cannot find subscriber'})
         }
    }catch(error){
       return res.status(500).json({message: error.message})
    }

    res.subscriber = subscriber
    next()
}

module.exports = router