import { Engine, Entity, Query  } from 'tick-knock';

class ComponentA { value = 1 };
class ComponentB { value = 2 };
class ComponentC { value = 3 };
class ComponentD { value = 4 };
class ComponentE { value = 5 };

export default (count) => {
	const engine = new Engine();

	 const queryA = new Query(entity => entity.has(ComponentA));
	 engine.addQuery(queryA);

	for (let i = 0; i < count; i++) {
		const entity = new Entity();
		entity.addComponent(new ComponentA());
		entity.addComponent(new ComponentB());
		entity.addComponent(new ComponentC());
		entity.addComponent(new ComponentD());
		entity.addComponent(new ComponentE());
		engine.addEntity(entity);
	}

	return () => {
		queryA.entities.forEach((entity)=>{
			const component = entity.get(ComponentA);
			component.value *= 2;
		});
  	};
}
