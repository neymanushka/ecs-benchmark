import { Engine, Entity, Query  } from 'tick-knock';

class ComponentA { value = 1 };
class ComponentB { value = 2 };
class ComponentC { value = 3 };
class ComponentD { value = 4 };
class ComponentE { value = 5 };

export default (count) => {
	const engine = new Engine();

	const queryAB = new Query(entity => entity.hasAll(ComponentA,ComponentB));
	const queryCD = new Query(entity => entity.hasAll(ComponentC,ComponentD));
	const queryCE = new Query(entity => entity.hasAll(ComponentC,ComponentE));

	engine.addQuery(queryAB);
	engine.addQuery(queryCD);
	engine.addQuery(queryCE);

	for (let i = 0; i < count; i++) {
		{
			const entity = new Entity();
			entity.addComponent(new ComponentA());
			entity.addComponent(new ComponentB());
			engine.addEntity(entity);
		}
		{
			const entity = new Entity();
			entity.addComponent(new ComponentA());
			entity.addComponent(new ComponentB());
			entity.addComponent(new ComponentC());
			engine.addEntity(entity);
		}
		{
			const entity = new Entity();
			entity.addComponent(new ComponentA());
			entity.addComponent(new ComponentB());
			entity.addComponent(new ComponentC());
			entity.addComponent(new ComponentD());
			engine.addEntity(entity);
		}
		{
			const entity = new Entity();
			entity.addComponent(new ComponentA());
			entity.addComponent(new ComponentB());
			entity.addComponent(new ComponentC());
			entity.addComponent(new ComponentE());
			engine.addEntity(entity);
		}
	}

	return () => {
		queryAB.entities.forEach((entity)=>{
			const componentA = entity.get(ComponentA);
			const componentB = entity.get(ComponentB);
			const t = componentA.value;
			componentA.value = componentB.value;;
			componentB.value = t;
		});

		queryCD.entities.forEach((entity)=>{
			const componentC = entity.get(ComponentC);
			const componentD = entity.get(ComponentD);
			const t = componentC.value;
			componentC.value = componentD.value;;
			componentD.value = t;
		});

		queryCE.entities.forEach((entity)=>{
			const componentC = entity.get(ComponentC);
			const componentE = entity.get(ComponentE);
			const t = componentC.value;
			componentC.value = componentE.value;;
			componentE.value = t;
		});
	};
}
