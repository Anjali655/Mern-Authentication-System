import yup from "yup";

export const userSchema = yup.object({
    username: yup
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters long")
        .required("Username is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .min(4, "Password must be of atleast 4 characters")
        .required("Password is required"),
});


export const validateUser = (schema) => async (req, res, next) => {

    try {
        await schema.validate(req.body);
        next();
    }
    catch (err) {
        return res.status(400).json({ errors: err.errors ? err.errors[0] : "Validation error" });
    }
};