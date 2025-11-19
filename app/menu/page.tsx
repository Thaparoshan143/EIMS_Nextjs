import ItemCard from "@/components/ItemCard";
import PageConstruction from "@/components/PageConstruction";
import { getRandomFoodItems } from "@/lib/data/_foodItems";

export default function Menu() {
  return (
    <div className="min-h-screen flex flex-col justify-evenly items-center pt-32">
        <h1 className="text-6xl font-main text-theme font-bold mb-8">Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[80%] gap-8">
          {
            getRandomFoodItems().map((props) => {
              return <ItemCard key={props.name} {...props} />
            })
          }
        </div>
        <span className="text-theme-alt my-16"><span className="text-2xl font-semibold">Other Items</span> comming soon!!!</span>
        {/* <PageConstruction /> */}
    </div>
  );
}
