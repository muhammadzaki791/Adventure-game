import chalk from "chalk";
import inquirer from "inquirer";

let enemies = ["Skeleton", "Zombie", "Assassin", "Fantom "];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;

let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 30; // Percentage

let running = true;

console.log(chalk.green("\t###########################"));
console.log(chalk.green("\t# Welcome to the Dungeon! #"));
console.log(chalk.green("\t###########################\n"));

GAME: while (running) {
  console.log(
    chalk.yellow("----------------------------------------------------------")
  );

  let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
  let enemy = enemies[Math.floor(Math.random() * enemies.length)];
  console.log(chalk.red(`\n\t-> ${enemy} has Appeared! <-`));

  while (enemyHealth > 0) {
    console.log(chalk.blue(`\tYour Health: ${health}`));
    console.log(chalk.blue(`\t${enemy}'s HP: ${enemyHealth}`));

    let input = await inquirer.prompt([
      {
        name: "infoUsr",
        type: "list",
        message: chalk.cyan("\tWhat would you like to do?"),
        choices: ["Attack", "Drink Health Potion", "Run"],
      },
    ]);

    if (input.infoUsr === "Attack") {
      let damageDealt = Math.floor(Math.random() * attackDamage);
      let damageTaken = Math.floor(Math.random() * enemyAttackDamage);

      enemyHealth -= damageDealt;
      health -= damageTaken;

      console.log(
        chalk.red(`\n\t> You strike the ${enemy} for ${damageDealt} damage.`)
      );
      console.log(
        chalk.red(`\n\t> You receive ${damageTaken} in retaliation!`)
      );

      if (health < 1) {
        console.log(
          chalk.bgRed(
            "\n\tYou have taken too much damage, you are too weak to go on!"
          )
        );
        break;
      }
    } else if (input.infoUsr === "Drink Health Potion") {
      if (numHealthPotions > 0) {
        health += healthPotionHealAmount;
        numHealthPotions--;
        console.log(
          chalk.green(
            `\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}.`
          )
        );
        console.log(chalk.green(`\t> Your health: ${health}.`));
        console.log(
          chalk.green(`\t> You have ${numHealthPotions} health potions left.\n`)
        );
      } else {
        console.log(
          chalk.red(
            "You have no health potions left! Defeat enemies for a chance to get one.\n"
          )
        );
      }
    } else if (input.infoUsr === "Run") {
      console.log(chalk.yellow(`\tYou run away from the ${enemy}!`));
      continue GAME;
    } else {
      console.log(chalk.red("\tInvalid command!"));
    }

    if (health < 1) {
      console.log(
        chalk.bgRed("You limp out of the dungeon, weak from battle.")
      );
      break;
    }
  }

  if (enemyHealth < 0) {
    console.log(chalk.green("\t##########################"));
    console.log(chalk.green(`\t# ${enemy} was defeated! #`));
    console.log(chalk.green("\t##########################"));
    console.log(`\t\nYou have ${health}% HP left`);

    if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
      numHealthPotions++;
      console.log(chalk.green(" # The enemy dropped a health potion! #"));
      console.log(
        chalk.green(` # You now have ${numHealthPotions} health potions. # `)
      );
    }

    let input1 = await inquirer.prompt([
      {
        name: "usrinfo",
        type: "list",
        message: chalk.cyan("What would you like to do now?"),
        choices: ["Continue Fighting", "Exit Dungeon"],
      },
    ]);

    if (input1.usrinfo === "Continue Fighting") {
      console.log(chalk.yellow("You continue on your adventure."));
    } else if (input1.usrinfo === "Exit Dungeon") {
      console.log(chalk.yellow("Exiting Dungeon..."));
      process.exit();
    }
  }
}
