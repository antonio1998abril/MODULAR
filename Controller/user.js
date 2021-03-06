const User = require ("../Models/UserSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyPass = (pass) =>{
    let charCheck = pass.length > 7 && pass.length < 31;
    let capitalCheck = /[A-Z]/g.test(pass);
    let numberCheck = /[0-9]/g.test(pass);
    let simbolCheck = /[,?!:;.@#%]/g.test(pass)
    return charCheck && capitalCheck &&  numberCheck && simbolCheck
}

const controller = {
    register: async (req,res,next)=>{
        const {name,email,lastname,ocupation,password,repeat} = req.body
        if (password != repeat) return res.status(302).json({msg:"No coincide las contraseñas"})

        const user =await User.findOne({email})
        if (user) return res.status(302).json({msg:"El email ya existe"})

        if (!verifyPass(password)) return res.status(302).json({msg:"Crea una contraseña con: 7 or mas letras, usando una letra mayuscula o mas, un numero and y algun simbolo como #, $, %, @"})

        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            name, email, password:passwordHash , lastname, ocupation
        })
            await newUser.save().then(result => {
        
            const accesstoken = createAccessToken({id:newUser._id, email:newUser.email})
            const refreshtoken = createRefreshToken({id: newUser._id, email:newUser.email})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })
            res.json({accesstoken})
        }).catch(next)
    },
    login: async(req,res,next) => {
        const {email, password} = req.body;
        console.log(email,password)
        const user = await User.findOne({email})

        if(!user) return res.status(302).json({msg: "User does not exist."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(302).json({msg: "Incorrect password."})

        const accesstoken = createAccessToken({id: user._id, email:user.email})
        const refreshtoken = createRefreshToken({id: user._id, email:user.email})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })
        res.json({accesstoken})
    },

    logout: async(req,res,next) => {
        res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
        return res.json({msg: "Logged out"})
    },

    refreshToken: async(req,res,next) =>{
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(302).json({msg: "Please Login or Register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(302).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id, email:user.email})
      /*       console.log("acceso",accesstoken) */
            res.json({accesstoken})
        })
    },
    getUser: async(req,res,next) => {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(302).json({msg: "Error to get user."})
        res.json(user)
    },
    upDateInfo: async(req,res,next) => {
        const info = {name, lastname, email, password, ocupation, tel, ocupation, tel} = req.body;
    },

    /* Admin */
    SuperGet: async(req,res,next) => {
        const superAdminRole = await User.findOne({email:req.user.email}).select('role')
        const AllUserRole = await User.find().lean();

        if(superAdminRole.role == '3'){
            res.json(AllUserRole)
        }else {
            res.json({msg:"No eres Admin"})
        }
    }
    
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = controller