import { Doctor } from '../models/doctorModal.js';

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    // Find doctor
    const doc = await Doctor.findById(docId);
    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Toggle availability
    const updated = await Doctor.findByIdAndUpdate(
      docId,
      { available: !doc.available },
      { new: true }
    );

    return res.json({
      success: true,
      message: `Doctor availability changed to ${updated.available}`,
      doctor: updated,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { changeAvailablity, doctorList };
