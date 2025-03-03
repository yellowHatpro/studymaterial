## Alert Dialogs
<hr>

### Anatomy of Alert Dialog

1. Alert Dialog
2. Title(optional)
3. Message
4. Text buttons
* import com.google.android.material.dialog.MaterialAlertDialogBuilder 

* Use the <b> MaterialAlertDialog</b> from Material Design Components library to add dialog.
* Since a dialog is UI related , the UI Controller (Activity/ Fragment) will be responsible for creating and showing the final score dialog.
* To create a MaterialAlertDialog, use the MaterialAlertDialogBuilder class.
* . Call the MaterialAlertDialogBuilder constructor passing in the content using the fragment's requireContext() method. The requireContext() method returns a non-null Context.


#### Make a dialog box

1. First add a backing property to the score variable. In ViewModel class, change the score variable declaration 

```
private var _score = 0
val score: Int
   get() = _score
```
2. In ExampleFragment class, add a private function called showFinalScoreDialog(). 

```
/*
* Creates and shows an AlertDialog with the final score.
*/
private fun showFinalScoreDialog() {
   MaterialAlertDialogBuilder(requireContext())
}
```
* Context here refers to the current state of the application , activity or fragment. It contains the information regarding the activity , fragment or application. Usually it is used to get access to resources, databases, and other system services.
Now we pass the fragment context to create the alert dialog.

3. Add the code to set the title on the alert dialog , use a string resource from strings.xml.

```
MaterialAlertDialogBuilder(requireContext())
   .setTitle(getString(R.string.congratulations))
```
4. Set the message to show the final score, use the read-only version of the score variable (viewModel.score), you added earlier.

```
   .setMessage(getString(R.string.you_scored, viewModel.score))
```
5. Make your alert dialog not cancelable when the back key is pressed, using setCancelable() method and passing false.

```
    .setCancelable(false)
```
6. Add two buttons using setNegativeButton() and setPositiveButton() , and call your functions to perform say exit() and restart() respectively from lambdas.

```
    .setNegativeButton(R.string.exit) { _, _ ->
        exit()
    }
    .setPositiveButton(R.string.restart) { _, _ ->
        restart()
    }
    .show()
```
Above was a trailing lambda syntax.

> setNegativeButton(getString(R.string.exit), { _, _ -> exitGame()}) where the setNegativeButton() method takes in two parameters: a String and a function, DialogInterface.OnClickListener() which can be expressed as a lambda. When the last argument being passed in is a function, you could place the lambda expression outside the parentheses.

```private fun showFinalScoreDialog() {
   MaterialAlertDialogBuilder(requireContext())
       .setTitle(getString(R.string.congratulations))
       .setMessage(getString(R.string.you_scored, viewModel.score))
       .setCancelable(false)
       .setNegativeButton(getString(R.string.exit)) { _, _ ->
           exitGame()
       }
       .setPositiveButton(getString(R.string.play_again)) { _, _ ->
           restartGame()
       }
       .show()
```
