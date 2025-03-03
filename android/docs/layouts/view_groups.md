# More than one views: ViewGroups

- A parent View Group holds multiple views
- child group, sibling groups

## Linear Layout

- keeps child horizontally or vertically
- child can be any view or viewgroup

## Relative Layout

### Different Views can be positioned:

- Relative to Parent align
- Relative to other child views

  ```xml
  <LinearLayout
  android:orientation="vertical"
  android:layout_width="wrap_content"
  android:layout_height="wrap_content">

  <TextView
      android:text="Guest List"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content" />

  <TextView
      android:text="Kunal"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content" />
  ```

</LinearLayout>
        ```

## Different Widths and Heights on Child Views

- Fixed : like 200dp , content can cutoff

## Wrap-Content

- fits acc to the content

## Match-parent

- grows as large as the parent, regardless of content

## Linear Layout Weight:

- To equally space children , set `layout height/width = 0dp` and
  `layout_weight = "1"` .
- More the weight more the space the child occupies.

## Relative Layout

### Relative to Parent

- Child View Attributes:

  ```xml
  android:layout_alignParentTop="true/false"
  android:layout_alignParentBottom="true/false"
  android:layout_alignParentRight="true/false"
  android:layout_alignParentLeft="true/false"
  ```

android:layout_centerHorizontal="true/false"
android:layout_centerVertical="true/false"

````
- Can use multiple at once
- Although declared in child view , these are used by parent view Group to position children, therefore start with layout_...

- Example:
```xml
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:layout_alignParentTop="true"
        android:textAppearance="?android:textAppearanceLarge"
        android:text="Happy" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_alignParentLeft="true"
        android:textAppearance="?android:textAppearanceLarge"
        android:text="Birthday" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textAppearance="?android:textAppearanceLarge"
        android:text="To You" />

</RelativeLayout>
````

## Relative To Other Views

- We can add constraints

  ```
  android:layout_toLeftOf = "@id/id_name"
  android:layout_above = "@id/id_name"
  ```

## Margin and Paddings

### Padding

- Padding is handles by the child view or simply the view
- Example:
  **TextView attribute**:
  ```
  android:padding="8dp"
  or
  android:paddingRight="8dp"
  android:paddingLeft="8dp"
  android:paddingBottom="8dp"
  android:paddingTop="8dp"
  ```

### Margin

- Margin is handled by the parent ViewGroup
- It needs ViewGroup
- Example:
  **TextView attribute**:
  `  android:layout_margin="8dp"
or
android:layout_marginLeft="8dp"
android:layout_marginRight="8dp"
android:layout_marginTop="8dp"
android:layout_marginBottom="8dp"`
- **Margin Important Info**
  - If we give 16dp margin between Views, the gap between the two will be 32 because one has top 16 and other has bottom 16 .
  - To want to have only 16 between the two, use marginTop =16dp, now we won't have bottom 16 .
