import { Weapon, MythicalWeaponStore } from "../mythical_weapon";

const store = new MythicalWeaponStore();

describe("Mythical Weapon Model", () => {
  let count: Number | undefined = 0;
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("index method should return a list of weapons", async () => {
    const result = await store.index();
    expect(result).toBeDefined();
  });

  it("create method should return a weapons", async () => {
    const weapon: Weapon = {
      name: "The Trident of Poseidon",
      type: "trident",
      weight: 150
    }
    const result = await store.create(weapon);
    count = result.id;
    expect(result.name).toEqual("The Trident of Poseidon");
  });

  it("show method should return a weapons", async () => {
    const result = await store.show(`${count}`);
    expect(result.name).toEqual("The Trident of Poseidon");
  });

  it("delete method should delete a weapons", async () => {
    const result = await store.delete(`${count}`);
    expect(result).toBe(1);
  });
});
