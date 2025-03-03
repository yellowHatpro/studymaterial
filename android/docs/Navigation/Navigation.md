## Navigation Components

# 3 Key Parts

#### 1. Navigation Graph 
<hr>

The navigation graph is an XML file that provides a visual representation of navigation in your app.
Just like with layout files, Android Studio provides a visual editor to add destinations and actions to the navigation graph.

#### 2. NavHost
<hr>
A NavHost is used to display destinations form a navigation graph within an activity.
When you navigate between fragments, the destination shown in the NavHost is updated. You'll use a built-in implementation, called NavHostFragment, in your MainActivity.

#### 3. NavController
<hr>

* The NavController object lets you control the navigation between destinations displayed in the NavHost.
* When working with intents, you had to call startActivity to navigate to a new screen. With the Navigation component, you can call the NavController's navigate() method to swap the fragment that's displayed.
* The NavController also helps you handle common tasks like responding to the system "up" button to navigate back to the previously displayed fragment.

## Navigation Dependencies

#### 1. In the project-level build.gradle file, in buildscript > ext, below material_version set the nav_version equal to 2.3.1.
```
buildscript {
    ext {
        appcompat_version = "1.2.0"
        constraintlayout_version = "2.0.2"
        core_ktx_version = "1.3.2"
        kotlin_version = "1.3.72"
        material_version = "1.2.1"
        nav_version = "2.3.1"
    }

    ...
```

#### 2. In the app-level build.gradle file, add the following to the dependencies group.

```
implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
implementation "androidx.navigation:navigation-ui-ktx:$nav_version"
```

> ### Safe Args Plugin

Safe Args is a Gradle plugin that will assist you with type safety when passing data between fragments.

<hr>

#### What do we need to do in :

##### 1. Use FragmentContainerView in MainActivity xml:

Add this within a layout tag:
```
 <androidx.fragment.app.FragmentContainerView
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:navGraph="@navigation/nav_graph"/>
```

change accordingly the properties..

##### 2. Setting up Navigation Graph:

Same as the file mentioned in app: navGraph="@navigation/nav_graph".

##### 3. Creating a navigation action: 

Connect fragments with arrows.
This generates a navigation action.
Example: <br>

```<fragment
        android:id="@+id/letterListFragment"
        android:name="com.example.wordsapp.LetterListFragment"
        android:label="@string/app_name">
        <action
            android:id="@+id/action_letterListFragment_to_wordListFragment"
            app:destination="@id/wordListFragment" />
    </fragment>
```
>Note: Make sure activity main xml is inside a layout tag.
##### 4. Setting the Start Destination:

On NavGraph xml file, set the start destination.

##### 5. Perform the Navigation Action

In the corresponding activity, , perform the following steps:
1. On the button click , set onClickListener to the button.
2. Add code to the onClickListener, for example:
```
val action = LetterListFragmentDirections.actionLetterListFragmentToWordListFragment(letter = holder.button.text.toString())
```
> Here, Safe Args plugin comes in .. 
the actions created on the NavGraph are turned into code that you can use. The names, however, should be fairly intuitive. LetterListFragmentDirections lets you refer to all possible navigation paths starting from the letterListFragment. The function actionLetterListFragmentToWordListFragment()
is the specific action to navigate to the wordListFragment.

Once we have the reference to navigation action , get a reference to the NavController object and call navigate() method.
```
holder.view.findNavController().navigate(action)
```
##### 6. Configure MainActivity

* Create navController property in MainActivity and it will be marked as lateinit since it will be set in onCreate() .

```
private lateinit var navController: NavController
```

* Then, after the call to setContentView() in onCreate(), get a reference to the nav_host_fragment (this is the ID of your FragmentContainerView) and assign it to your navController property.

```
val navHostFragment = supportFragmentManager
    .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
navController = navHostFragment.navController
```

* Then in onCreate() call setupActionBarWithNavController() and pass navController as the parameter.
This ensures action bar (app bar) buttons, like the menu option in LetterListFragment are visible.

```
setupActionBarWithNavController(navController)
```

* Finally implement onSupportNavigateUp() . 
 Along with setting defaultNavHost to true in the XML, this method allows you to handle the up button. 

```
override fun onSupportNavigateUp(): Boolean {
   return navController.navigateUp() || super.onSupportNavigateUp()
}
```

> Because the navigateUp() function might fail, it returns a Boolean for whether or not it succeeds. However, you only need to call super.onSupportNavigateUp() if navigateUp() returns false


