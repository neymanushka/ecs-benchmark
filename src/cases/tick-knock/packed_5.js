import { Engine, Entity, Query  } from 'tick-knock';

class ComponentA { value = 1 };
class ComponentB { value = 2 };
class ComponentC { value = 3 };
class ComponentD { value = 4 };
class ComponentE { value = 5 };

export default (count) => {
	const engine = new Engine();

	const queryA = new Query(entity => entity.has(ComponentA));
	const queryB = new Query(entity => entity.has(ComponentB));
	const queryC = new Query(entity => entity.has(ComponentC));
	const queryD = new Query(entity => entity.has(ComponentD));
	const queryE = new Query(entity => entity.has(ComponentE));

	engine.addQuery(queryA);
	engine.addQuery(queryB);
	engine.addQuery(queryC);
	engine.addQuery(queryD);
	engine.addQuery(queryE);

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
		queryB.entities.forEach((entity)=>{
			const component = entity.get(ComponentB);
			component.value *= 2;
		});
		queryC.entities.forEach((entity)=>{
			const component = entity.get(ComponentC);
			component.value *= 2;
		});
		queryD.entities.forEach((entity)=>{
			const component = entity.get(ComponentD);
			component.value *= 2;
		});
		queryE.entities.forEach((entity)=>{
			const component = entity.get(ComponentE);
			component.value *= 2;
		});
	};
}
