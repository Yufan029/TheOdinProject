1. Allow item belong to zero or multiple categories, like LV belongs to fashion and luxury.
Items 
    id, 
    name,

Categories
    id,
    name,

ItemCategories
    ItemId
    CategoryId
    PRIMARY KEY (ItemId, CategoryId),
    FOREIGN KEY (ItemId) REFERENCE Items(id),
    FOREIGN KEY (CategoryId) REFERENCE Categories(id)

this SQL query can be used for put item names and categoires names in one table and one row for each item.
SELECT 
    i.Name AS ItemName,
    STRING_AGG(c.Name, ', ') AS Categories
FROM Items i
JOIN ItemCategories ic ON i.ItemId = ic.ItemId
JOIN Categories c ON ic.CategoryId = c.CategoryId
GROUP BY i.Name;

Question: should I write the insert sql statement for 2 table myself, say if I want to add a nike, it's shoes and sports, Is there a express statement so I can add it by one sentence then the db will automatically updated.

This question can be solved by the ORM, (Sequelize for Node) or (EF core for dotnet), they both can update the junction table automatically if the relationships are defined.
But for this project, I reckon I should go for the manual way, update the item table then update the relationship table.
Traditional SQL approach
    -- Insert item
    INSERT INTO Items (Name) VALUES ('Nike');
    -- Suppose ItemId = 10 after insert

    -- Insert junction
    INSERT INTO ItemCategories (ItemId, CategoryId) VALUES (10, 1); -- Shoes
    INSERT INTO ItemCategories (ItemId, CategoryId) VALUES (10, 2); -- Sports

Express/Node.js approach
    const itemName = 'Nike';
    const categoryIds = [1, 2]; // Shoes, Sports

    // Example using async/await and a transaction
    await db.transaction(async trx => {
    // Insert item
    const result = await trx('Items').insert({ Name: itemName }).returning('ItemId');
    const itemId = result[0];

    // Insert junctions
    const itemCategories = categoryIds.map(catId => ({ ItemId: itemId, CategoryId: catId }));
    await trx('ItemCategories').insert(itemCategories);
    });

Using Sequelize (ORM for Node.js)
    const nike = await Item.create(
        { Name: 'Nike', Categories: [{ CategoryId: 1 }, { CategoryId: 2 }] },
        { include: [Category] }
    );

If C#, dotnet, EF Core
    public class Item
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public ICollection<Category> Categories { get; set; } = new List<Category>();
    }

    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<Item> Items { get; set; } = new List<Item>();
    }

    var shoes = db.Categories.Find(1);
    var sports = db.Categories.Find(2);

    var nike = new Item
    {
        Name = "Nike",
        Categories = new List<Category> { shoes, sports }
    };

    db.Items.Add(nike);
    db.SaveChanges();

2. Category use checkbox, and if I want to click the checkbox then reload the data, no need to click a submit button.

<form action="/submit" method="get" id="categoryForm">
  <label><input type="checkbox" name="category" value="rpg" onchange="this.form.submit()"> RPG</label>
  <label><input type="checkbox" name="category" value="adventure" onchange="this.form.submit()"> Adventure</label>
  <label><input type="checkbox" name="category" value="openworld" onchange="this.form.submit()"> Open World</label>
  <!-- more checkboxes -->
</form>

server side can parse the req.query and change the value to array
let categories = [].concat(req.query.category || []);

since it's a back-end project, I'll do the html, reload the data everytime when checkbox tick / untick.
This must involve some overhead tasks, like a checkbox already tick, and I tick another then, the original data need to be retrieved again.

3. When seeding the db, everytime I delete the content from the table and insert again, but I forgot to reset the identity counter.

So the first time works, but after that the identity will not start from 1 again. I need to reset the counter!
TRUNCATE TABLE Items RESTART IDENTITY CASCADE;
TRUNCATE TABLE Categories RESTART IDENTITY CASCADE;
TRUNCATE TABLE ItemCategories;

4. 因为已经在app.js里指明了express static file的folder，所以在header.ejs中直接引用href="/styles.css"即可。

5. Delete category then redirect to the "/", lost the selected categories info.

6. express-validator custom validation for unique category name. also LOWER used in the SQL sentence.