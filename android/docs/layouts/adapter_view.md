# Building Layouts with an Adapter

- AdapterView is used when content for layout is dynamic and not preplanned.
- To populate layout with views at runtime, we can use a layout that subclasses AdapterView.
- A subclass of the AdapterView uses an Adapter to bind data to its layout.

# Adapter 
- Adapter retrieves data (from source such as array/ database query) and **converts each entry into a view** that can be added into the AdapterView layout.

- Common layout backed by an adapter include:
        ***List View***
        ***Grid View***
- AdapterView - {ListView, GridView}

# Filling an AdapterView with data

 - AdapterViews can be populated by binding the AdapterView instance to an Adapter.

 - Adapter retrives data from an external source and creates a View that represents each data entry.

- Android provides several subclasses of Adapter.Two most common adapters are:

## ArrayAdapter
- Used when data source is an array.
- By default, ArrayAdapter creates a view for each array item by calling **toString()** on each item and placing the contents in a **TextView**.
- Example:
```Java (Kotlin)
val adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, myStringArray)
```

- arguments to the constructor:
### context : this
### layout that contains a TextView for each string in the array: android.R.layout.simple_list_item_1
### the string array : myStringArray
- after this call setAdapter() on the ListView
```Java (Kotlin)
val listView: ListView = findViewById(R.id.listview)
listView.adapter = adapter
```
- To customize the appearance of each item we can override the toString() method for the object in the array.
- To create a view for each item that's not TextView ,extend the ArrayAdapter class and override **getView()** to return the type of view we want for each item.
### For example:
        If we want an ImageView for each array item


## SimpleCursorAdapter
- Used when data comes from a Cursor.
### For example:
        if you want to create a list of people's names and phone numbers, you can perform a query that returns a Cursor containing a row for each person and columns for the names and numbers. You then create a string array specifying which columns from the Cursor you want in the layout for each result and an integer array specifying the corresponding views that each column should be placed.