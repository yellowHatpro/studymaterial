# Android Studio Fragment Lifecycle

* INITIALIZED: A new instance of the fragment has been instantiated.
* CREATED: The first fragment lifecycle methods are called. During this state, the view associated with the fragment is also created.
* STARTED: The fragment is visible onscreen but does not have "focus", meaning it can't respond to user input.
* RESUMED: The fragment is visible and has focus.
* DESTROYED: The fragment object has been de-instantiated.

#### Various Fragment Lifecycle Methods:
* onCreate(): The fragment has been instantiated and is in the CREATED state. However, it's corresponding view has not been created yet.
* onCreateView(): This method is where you inflate the layout. The fragment has entered the CREATED state.
* onViewCreated(): This is called after the view is created. In this method, you would typically bind specific views to properties by calling findViewById().
* onStart(): The fragment has entered the STARTED state.
* onResume(): The fragment has entered the RESUMED state and now has focus (can respond to user input).
* onPause(): The fragment has re-entered the STARTED state. The UI is visible to the user
* onStop(): The fragment has re-entered the CREATED state. The object is instantiated but is no longer presented on screen.
* onDestroyView(): Called right before the fragment enters the DESTROYED state. The view has already been removed from memory, but the fragment object still exists.
* onDestroy(): The fragment enters the DESTROYED state..

<hr>

<table>
<tr>
<td>
Lifecycle State
</td>
<td>
Callback
</td>
</tr>
<tr>
<td>
CREATED
</td>
<td>
onCreate()
onCreateView()
onViewCreated()
</td>
</tr>
<tr>
<td>
STARTED
</td>
<td>
onStart()
</td>
</tr>
<tr>
<td>
RESUMED
</td>
<td>
onResume()
</td>
</tr>
<tr>
<td>
STARTED
</td>
<td>
onPause()
</td>
</tr>
<tr>
<td>
CREATED
</td>
<td>
onStop()
onDestroyView()
</td>
</tr>
<tr>
<td>
DESTROYED
</td>
<td>
onDestroy()
</td>
</tr>
</table>


