import promoModel from "../models/promoModel.js";

const applyPromo = async (req, res) => {
  try {
    const { code } = req.body;

    
    const promo = await promoModel.findOne({
  code: { $regex: `^${code}$`, $options: "i" },
  active: true,
});

    if (!promo) {
      return res.json({
        success: false,
        message: "Invalid Promo Code",
      });
    }

    res.json({
      success: true,
      discount: promo.discount,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });
  }
};
const addPromo = async (req, res) => {
  try {
    const promo = new promoModel(req.body);
    await promo.save();

    res.json({
      success: true,
      message: "Promo Added"
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

export { applyPromo ,addPromo};