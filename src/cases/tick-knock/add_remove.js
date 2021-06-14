import { Engine, Entity, Query  } from 'tick-knock';


class ComponentA { value = 0 };
class ComponentB { value = 0 };

export default (count) => {
	const engine = new Engine();

	 const queryA = new Query(entity => entity.has(ComponentA));
	 const queryB = new Query(entity => entity.has(ComponentB));

	 engine.addQuery(queryA);
	 engine.addQuery(queryB);

	for (let i = 0; i < count; i++) {
		const entity = new Entity();
		entity.addComponent(new ComponentA());
		engine.addEntity(entity);
	}

	return () => {
		for(const entity of queryA.entities){
			entity.addComponent(new ComponentB());
		};

		for(const entity of queryB.entities){
			entity.removeComponent(ComponentB);
		};
  	};
}

