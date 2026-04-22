import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema =new mongoose.Schema( 
 {name:{
        type:String,
        required:true,
        trim: true,
        minlength: 3,
        maxlength:50,


    },
    email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        }
    },
    {
        timestamps: true,
    }
);

// Hash the password before saving the user
userSchema.pre("save", async function presave(){
    if(!this.isModified("password")){
        return;
}

this.password = await bcrypt.hash(this.password, 10);
return;

})


userSchema.methods.comparePassword = async function comparePassword = function comparePassword(rawPassword) {
    return bcrypt.compare(rawPassword, this.password);
}

userSchema.methods.toJSON = function toJSON() {
const userObject = this.toObject();
delete userObject.password;
return userObject;
}

const User = mongoose.model("User", userSchema);

export default User;











