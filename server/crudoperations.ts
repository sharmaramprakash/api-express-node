// this export {} de-attaches all require from other similar require in some another file in same project.
export {} 
const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

const courses = [
    {
        id: 1,
        name: ".NET"
    },
    {
        id: 2,
        name: "Python"
    }
];

app.get('/', (req, res) => {
    res.send("Hello! Ram, Have a wonderful evening!");
});

app.get('/api/courses/example1/:id/:name', (req, res) => {
    res.send(req.params);
});

app.get('/api/courses/example2/:id/:name', (req, res) => {
    res.send(req.params.id + " " + req.params.name);
});

app.get('/api/example1/courses/:id', (req, res) => {
    res.send(req.query);
});

// GET
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/example2/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course === undefined) res.status(404).send(`The course with id ${req.params.id} is not found!`);
    res.send(course);
});

// POST
app.post('/api/courses/example1/:name', (req, res) => {
    let id = courses.length + 1;
    let name = req.params.name;

    let course = { id, name };
    courses.push(course);

    res.json(courses);
});

app.post('/api/courses/example2/', (req, res) => {
    let id = courses.length + 1;
    let name = req.body.name;

    let course = { id, name };
    courses.push(course);

    res.json(courses);
});


// PUT
app.put('/api/courses/example2/', (req, res) => {
    
    let schema = Joi.object({
        name: Joi.string().min(3).required(),
        id: Joi.number()
    });

    let result = schema.validate(req.body);

    if (result.error) {
        return res.status(404).send(result.error.details[0].message);
    }
    
    const course = courses.find(c => c.id === parseInt(req.body.id));
    course.name = req.body.name;
    
    res.send(courses);
});

// DELETE
app.delete('/api/courses/example1/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    let index = courses.indexOf(course);

    let deletedCourse = courses.splice(index,1);

    res.send(deletedCourse);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisening on the port ${port}`));