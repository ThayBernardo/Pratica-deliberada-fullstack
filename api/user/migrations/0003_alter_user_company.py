# Generated by Django 4.2.4 on 2023-09-10 21:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("company", "0003_alter_company_created_by"),
        ("user", "0002_alter_user_password"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="company",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                primary_key=True,
                related_name="user",
                serialize=False,
                to="company.company",
            ),
        ),
    ]
