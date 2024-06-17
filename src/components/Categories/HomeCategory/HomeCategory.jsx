//src\components\HomeCategory\HomeCategory.jsx

export default function HomeCategory({ allProducts, categoryList }) {
  return (
    <div>
      {categoryList.map((category, index) => {
        return (
          <div>
            <p> {category.name} </p>
          </div>
        );
      })}
    </div>
  );
}
