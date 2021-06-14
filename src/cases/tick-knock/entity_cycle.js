import { Engine, Entity, Query } from 'tick-knock';

class ComponentA {
	constructor(value) {
		this.value = value;
	}
}
class ComponentB {
	constructor(value) {
		this.value = value;
	}
}

export default (count) => {
	const engine = new Engine();

	const queryA = new Query((entity) => entity.has(ComponentA));
	const queryB = new Query((entity) => entity.has(ComponentB));

	engine.addQuery(queryA);
	engine.addQuery(queryB);

	for (let i = 0; i < count; i++) {
		const entity = new Entity();
		entity.addComponent(new ComponentA(i));
		engine.addEntity(entity);
	}

	return () => {
		for (const entity of queryA.entities) {
			const component = entity.get(ComponentA);
			const entity0 = new Entity();
			entity0.addComponent(new ComponentB(component.value));
			engine.addEntity(entity0);
			const entity1 = new Entity();
			entity1.addComponent(new ComponentB(component.value));
			engine.addEntity(entity1);
		}
		for (const entity of queryB.entities) {
			engine.removeEntity(entity);
		}
	};
};
