const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const port = 4000;

app.use(cors());

app.use(express.json());

// ฟังก์ชันสำหรับสุ่มชื่อ

const firstNames = ['John', 'Jane', 'Michael', 'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace'];
const lastNames = ['Doe', 'Smith', 'Brown', 'Johnson', 'Williams', 'Jones', 'Miller', 'Davis', 'Garcia', 'Martinez'];
const avatars = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/women/6.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
  'https://randomuser.me/api/portraits/women/8.jpg',
  'https://randomuser.me/api/portraits/men/9.jpg',
  'https://randomuser.me/api/portraits/women/10.jpg'
];

// ฟังก์ชันสำหรับสุ่มค่า
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomUsers(count) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
    const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
    const age = getRandomInt(18, 65); 
    const avatar = avatars[getRandomInt(0, avatars.length - 1)]; 
    users.push({
      id: i,
      firstName,
      lastName,
      age,
      avatar 
    });
  }
  return users;
}

let users = generateRandomUsers(100);

// 1. อ่านข้อมูลผู้ใช้ทั้งหมด (Read)
app.get('/users', (req, res) => {
  res.json(users);
});

// 2. อ่านข้อมูลผู้ใช้คนเดียวโดยใช้ ID (Read)
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (user) {
    res.status(200).json({
      message: `User Id = ${id} has been found`,
      status: "ok",
      user: user
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 3. สร้างผู้ใช้ใหม่ (Create)
app.post('/users/create', (req, res) => {
  const { firstName, lastName, age, avatar } = req.body;
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  const newUser = {
    id: maxId + 1,
    firstName,
    lastName,
    age,
    avatar 
  };
  
  users.push(newUser);

  res.status(201).json({
    message: `User Id = ${newUser.id} is created`,
    status: "ok",
    user: newUser
  });
});

  // 4. แก้ไขข้อมูลผู้ใช้ (Update)
app.put('/users/update/:id', upload.single('profileImage'), (req, res) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, age } = req.body;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    
    users[userIndex].firstName = firstName;
    users[userIndex].lastName = lastName;
    users[userIndex].age = age;

    
    if (req.file) {
      users[userIndex].avatar = req.file.filename; 
    }

    res.status(200).json({
      message: `User Id = ${id} has been updated`,
      status: "ok",
      user: users[userIndex]
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});



// 5. ลบผู้ใช้ (Delete)
app.delete('/users/delete/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    users = users.filter(u => u.id !== id);
    res.status(200).json({
      message: `User Id = ${id} is deleted`,
      status: "ok",
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`API CRUD running at http://localhost:${port}`);
});




