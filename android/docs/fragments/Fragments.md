# Fragments are just like activities, but there are few differences.

```
class AboutFragment : Fragment(){
    override fun onCreateView(...): View?{
        //Inflate the layout for this fragment
        return inflater.inflate(
            R.layout.fragment_about,....)
    }
}
```

# How different from Activity

```
override fun onCreate (savedInstanceState: Bundle?){
    super.onCreate(savedInstanceState)
    val binding = DataBindingUtil
    .setContentView<ActivityMainBinding>(
        this, R.layout.activity_main)
}
```

## Within activity , we pass the layout ex. R.layout.activity_main in onCreate .

- Activity then inflates the layout and places it correctly within the activity's layout heirarchy. 

## In fragments, we manually inflate and return the inflated layout within the onCreateView method which is independent of onCreate

# Another difference

- ActivityCompat is inherited from context class but fragment's not, we need to use **context** property within a fragment to access app data typically associated with the context. 
- Ex: in fragments
  
  ```
  context!!.getString(R.string.app_name)
  context!!.getDrawable(R.drawablw.ic_launcher_background)
  ```

# ig fragments are not attached to viewgroups , but to activity.