const router = require('express').Router();
const db = require('./db');

router.get('/request', async (req: any, res: any) => {
  try {
    const data = await db.query('SELECT * FROM employee_data');
    res.json(data.rows);
  } catch (err) {
    console.log('error getting employee data', err);
    res.status(400);
  }
});

router.post('/post', async (req: any, res: any) => {
  try {
    await db.query(`INSERT INTO employee_data(name, department, age) VALUES ('${req.body.name}', '${req.body.department}', ${req.body.age})`);
    res.json({message: 'succesfully inserted'}).status(200);
  } catch (err) {
    console.log('error getting employee data', err);
    res.status(400);
  }
});

module.exports = router;