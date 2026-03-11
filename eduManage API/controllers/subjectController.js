
let subjectList = [
 { id:1, name:"Mathematics", credits:4 },
 { id:2, name:"Physics", credits:3 }
];

exports.getSubjects = (req,res)=>{
 res.json(subjectList);
};

exports.addSubject = (req,res)=>{
 const {name,credits} = req.body;

 const subject = {
  id: subjectList.length+1,
  name,
  credits
 };

 subjectList.push(subject);

 res.json({message:"Subject added", subject});
};
