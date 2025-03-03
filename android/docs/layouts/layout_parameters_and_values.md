# Basics on layout params and values

- wrap_content: tells view to size itself to the dimensions required by its content.

- match_parent : tells view to become as big as its parent view group will allow.

- all touch targets ike buttons should be atleast 48 \* 48dp

- textSize = "\_\_sp"

- sp stands for scale independent pixels

- sp is used for fonts.

---

# Colors :

use material design specs to get color codes

- android: background="#2196F3"
- android: textColor="ffffff"

---

# Image:

- android: scaleType="say, centerCrop"
  **centerCrop** -> what centerCrop does is it first scales an imageView as per the width and height without warping the image, and then crops the part which goes outside the screen.

  ## centerCrop , layout_height, layout_width works hand in hand.

---

# Font:

- fontFamily to set font style.
- textSize to set Size.
- textColor to set color of Fonts.

---

# Different Android Views

    * TextView
    * EditText
    * Button
    * Image Button
    * Date Picker
    * RadioButton
    * CheckBox buttons
    * Image View

# Different View Groups

    * LinearLayout
    * RelativeLayout
    * FrameLayout
    * GridView
    * ListView

# Types of Layouts

    * Linear Layout
    * Relative Layout
    * Constraint Layout
    * Table Layout
    * Frame Layout
    * List View
    * Grid View
    * Absolute Layout
    * WebView
    * ScrollView

https://data-flair.training/blogs/wp-content/uploads/sites/2/2020/05/types-of-android-Layouts.jpg

# Overlapping Views

- The view which is written first , is displayed most below.
- Example: use imageview before textview or else the image will hide the textview beneath it.
