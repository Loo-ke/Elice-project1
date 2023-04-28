import { authService } from "../services/auth-service.js";

export const handlelogin = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const { token, isAdmin } = await authService.login(userId, password);
    res.status(200).json({ token, isAdmin });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
};

export const handlelogout = async (req, res) => {
  try {
    if (req.user) {
      await authService.logout(req.user.id);
    }
    req.logout((err) => {
      if (err) throw err;
      res.status(200).send("로그아웃 되었습니다.");
    }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "로그아웃에 실패했습니다." });
  }
};