import { Engine, Entity, Query  } from 'tick-knock';


export default (count) => {
	const engine = new Engine();

	class DataComponent {
		value = 0;
	}

	class Component {
		value = 0;
	}

	const COMPS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ", (name) =>
		Function("Component", `return class ${name} extends Component {}`)(Component)
  	);


	const queryData = new Query(entity => entity.has(DataComponent));

	engine.addQuery(queryData);

	for (let i = 0; i < count; i++) {
		for (let Comp of COMPS) {
			const entity = new Entity();
			entity.addComponent(Comp)
			entity.addComponent(DataComponent);
			engine.addEntity(entity);
		}
  	}

	return () => {
		queryData.entities.forEach((entity)=>{
			const component = entity.get(DataComponent);
			component.value *= 2;
		});
	};
}
