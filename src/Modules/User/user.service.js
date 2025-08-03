import User from "../../DB/Models/user.model.js";

export const createUser = async (data) => {
  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = User.build(data);
  await user.save();

  return user;
};


export const updateChecker = async(id,data)=>{

    let user = await User.findByPk(id);
    if (user) {
        await user.update(data);
        return { message: "User updated", user };
      } else {
        user = User.build({ id, data});
        await user.save();
        return { message: "User created", user };
      }
}


export const findUserByEmail = async(email)=>{
    
const user = await User.findOne({where:{email:email}});

if(user){
    return user;
}else{
    return "User not found";
}
}

export const excludeRole = async(id)=>{
 
    const user = await User.findByPk(id,{attributes:{exclude:["role"]}});

    return user;

}