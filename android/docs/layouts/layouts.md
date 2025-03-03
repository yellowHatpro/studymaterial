# Android Layouts:

- Layout defines the structure for a user interface in app, such as an activity.

- Elements are built using hierarchy of View and ViewGroup objects .

- View usually draws something the user can see and interact with.

- ViewGroup is an invisible container that defines the layout structure for View and other ViewGroup objects. Mtlb View Group can have other view groups and multiple views as well.

## View

- View objects are usually called "widgets"

- It can be of many subclasses , like Button, TextView.

## ViewGroup

- ViewGroup objects are usually called "Layouts".

- Can be of many types , such as LinearLayout or ConstraintLayout.

## Writing and Loading XML

### Writing the XML

```xml
    <?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical" >
    <TextView android:id="@+id/text"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:text="Hello, I am a TextView" />
    <Button android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello, I am a Button" />
</LinearLayout>
```

## Load the XML Resource

- On compilation of app, XML layout file is compiled into a View resource.

- Load the layout resource from app code, in Activity.onCreate() .

- Done so by calling setContentView(), passing the reference to the layout resource in the form of :
  R.layout.layout_file_name .

```Java
fun onCreate(savedInstanceState: Bundle) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.main_layout)
}
```

## Attributes :

- give id:

  ```
  android:id="@android:id/something"
  ```

- fetch id:

  ```
  val myButton: Button = findViewById(R.id.something)
  ```
