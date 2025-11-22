import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // סעיף a: מספר אוטומטי
    serialNumber: {
      type: Number,
      default: () => Date.now(), // פונקציה שרצה כשהמוצר נוצר
      immutable: true,
    },

    // סעיף b: שם מוצר
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true, // מסיר רווחים מיותרים
      maxlength: 50,
    },

    // סעיף c: מק"ט (חיובי או 0)
    sku: {
      type: Number,
      required: [true, "SKU is required"],
      min: [0, "SKU must be a positive number"],
    },

    // סעיף d: תיאור
    description: {
      type: String,
    },

    // סעיף e: סוג מוצר
    category: {
      type: String,
      enum: {
        values: ["ירק", "פרי", "גידולי שדה"],
        message: "{VALUE} is not a supported category",
      },
      required: true,
    },

    // סעיף f: תאריך שיווק (ברירת מחדל שבוע אחורה)
    marketingDate: {
      type: Date,
      default: function () {
        const date = new Date();
        date.setDate(date.getDate() - 7); // מוריד 7 ימים מהיום
        return date;
      },
    },
  },
  { timestamps: true }
); // מוסיף אוטומטית createdAT ו-updatedAt

const Product = mongoose.model("Product", productSchema);

export default Product;
