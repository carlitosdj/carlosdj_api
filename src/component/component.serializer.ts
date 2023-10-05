import { Component } from '@prisma/client';

export class ComponentSerializer {
  id: number;

  name: string;
  description: string;
  created_at: number;
  status: number;
  order: number;
  duration: number;
  tags: string;
  orderby: string;
  component_id: number;
  parent: {
    id: number;
    name: string;
    description: string;
  };
  //children

  constructor(component: Component) {
    this.id = component.id;
    this.component_id = component.component_id;
    this.created_at = component.created_at;
    this.duration = component.duration;
    this.name = component.name;
    this.order = component.order;
    this.orderby = component.orderby;
    this.status = component.status;
    //this.parent = component.parent;
  }
}
