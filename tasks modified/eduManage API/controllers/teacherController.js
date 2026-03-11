
let teacherList = [
 { id:1, name:"Ramesh", subject:"Mathematics"},
 { id:2, name:"Anitha", subject:"Physics"}
];

exports.getTeachers = (req,res)=>{
 res.json(teacherList);
};

exports.addTeacher = (req,res)=>{
 const {name,subject} = req.body;

 const teacher = {
  id: teacherList.length+1,
  name,
  subject
 };

 teacherList.push(teacher);

 res.json({message:"Teacher added", teacher});
};
