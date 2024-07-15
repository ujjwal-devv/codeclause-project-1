document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');

    // Function to fetch and display recipes
    const displayRecipes = () => {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipeList.innerHTML = recipes.map((recipe, index) => 
            `<li>
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            </li>`
        ).join('');
    };

    // Initial load
    displayRecipes();

    // Add a new recipe
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('recipe-name').value;
        const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(ing => ing.trim());
        const instructions = document.getElementById('recipe-instructions').value;

        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push({ name, ingredients, instructions });
        localStorage.setItem('recipes', JSON.stringify(recipes));

        recipeForm.reset();
        displayRecipes();
    });

    // Edit a recipe
    window.editRecipe = (index) => {
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const recipe = recipes[index];

        document.getElementById('recipe-name').value = recipe.name;
        document.getElementById('recipe-ingredients').value = recipe.ingredients.join(', ');
        document.getElementById('recipe-instructions').value = recipe.instructions;

        // Remove the recipe on edit to avoid duplicates
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    };

    // Delete a recipe
    window.deleteRecipe = (index) => {
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    };
});
