import { Engine, Entity, Query  } from 'tick-knock';

class ComponentA {
	constructor(value){
		this.value = value;
	}
};

class ComponentB {
	constructor(value){
		this.value = value;
	}
};

export default (count) => {
	const engine = new Engine();

	const queryA = new Query(entity => entity.has(ComponentA));
	const queryB = new Query(entity => entity.has(ComponentB));

	engine.addQuery(queryA);
	engine.addQuery(queryB);

	for (let i = 0; i < count; i++) {
		const entity = new Entity();
		entity.addComponent(new ComponentA(i));
		engine.addEntity(entity);
	}


	return () => {
		queryA.entities.forEach((entity)=>{
			const component = entity.get(ComponentA);
			const entity0 = new Entity();
			entity0.addComponent(new ComponentB(component.value));
			engine.addEntity(entity0);
			const entity1 = new Entity();
			entity1.addComponent(new ComponentB(component.value));
			engine.addEntity(entity1);
		});
		queryB.entities.forEach((entity)=>{
			engine.removeEntity(entity);
		});
	};
}

// import { ECS, types } from "wolf-ecs";

// export default function (n) {
//   const ecs = new ECS();

//   ecs.defineComponent("A");
//   ecs.defineComponent("B");

//   const qA = ecs.createQuery("A");
//   const qB = ecs.createQuery("B");

//   function create() {
//     for (let i = 0, l = qA.archetypes.length; i < l; i++) {
//       for (let j = 0, l = qA.archetypes[i].entities.length; j < l; j++) {
//         const id = ecs.createEntity();
//         ecs.addComponent(id, "B");
//         const id2 = ecs.createEntity();
//         ecs.addComponent(id2, "B");
//       }
//     }
//   }

//   function destroy() {
//     for (let i = 0, l = qB.archetypes.length; i < l; i++) {
//       for (let j of qB.archetypes[i].entities) {
//         ecs.destroyEntity(j);
//       }
//     }
//   }

//   for (let i = 0; i < n; i++) {
//     ecs.createEntity();
//     ecs.addComponent(i, "A");
//     ecs.components.A[i] = 1;
//   }

//   create();
//   destroy();

//   return () => {
//     create();
//     destroy();
//   };
// }
